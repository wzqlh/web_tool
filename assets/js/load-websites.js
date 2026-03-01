$(document).ready(function() {
    loadWebsites();
    
    $(document).on('click', '.sidebar-menu-inner a', function(e) {
        if (!$('.sidebar-nav').hasClass('mini-sidebar')) {
            $(this).parent("li").siblings("li.sidebar-item").children('ul').slideUp(200);
            if ($(this).next().css('display') == "none") {
                $(this).next('ul').slideDown(200);
                $(this).parent('li').addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
            } else {
                $(this).next('ul').slideUp(200);
                $(this).parent('li').removeClass('sidebar-show');
            }
        }
    });
});

function loadWebsites() {
    $.getJSON('./config/websites.json', function(data) {
        renderSidebar(data.categories);
        renderContent(data.categories, data.websites);
    }).fail(function() {
        console.error('Failed to load websites configuration');
    });
}

function renderSidebar(categories) {
    const sidebarMenu = $('.sidebar-menu-inner ul');
    
    categories.forEach(category => {
        let categoryHtml = '';
        
        if (category.subcategories && category.subcategories.length > 0) {
            const firstSubId = category.subcategories[0].id;
            categoryHtml = `
                <li class="sidebar-item">
                    <a href="#${firstSubId}" class="smooth change-href" data-change="#${firstSubId}">
                        <i class="${category.icon} fa-lg icon-fw icon-lg mr-2"></i>
                        <span>${category.name}</span>
                        <i class="iconfont icon-arrow-r-m sidebar-more text-sm"></i>
                    </a>
                    <ul>
                        ${category.subcategories.map(sub => `
                            <li><a href="#${sub.id}" class="smooth"><span>${sub.name}</span></a></li>
                        `).join('')}
                    </ul>
                </li>
            `;
        } else {
            categoryHtml = `
                <li class="sidebar-item">
                    <a href="#${category.id}" class="smooth">
                        <i class="${category.icon} fa-lg icon-fw icon-lg mr-2"></i>
                        <span>${category.name}</span>
                    </a>
                </li>
            `;
        }
        
        sidebarMenu.append(categoryHtml);
    });
}

function renderContent(categories, websites) {
    const contentDiv = $('#content');
    
    categories.forEach(category => {
        if (category.subcategories && category.subcategories.length > 0) {
            category.subcategories.forEach(sub => {
                const subWebsites = websites.filter(site => site.categoryId === sub.id);
                
                if (subWebsites.length > 0) {
                    const subSection = `
                        <br />
                        <div class="d-flex flex-fill">
                            <h4 class="text-gray text-lg mb-4">
                                <i class="site-tag iconfont icon-tag icon-lg mr-1" id="${sub.id}"></i>
                                ${sub.name}
                            </h4>
                            <div class="flex-fill"></div>
                        </div>
                        <div class="row">
                            ${subWebsites.map(site => createWebsiteCard(site)).join('')}
                        </div>
                    `;
                    
                    contentDiv.append(subSection);
                }
            });
        } else {
            const categoryWebsites = websites.filter(site => site.categoryId === category.id);
            
            if (categoryWebsites.length > 0) {
                const categorySection = `
                    <br />
                    <div class="d-flex flex-fill">
                        <h4 class="text-gray text-lg mb-4">
                            <i class="site-tag iconfont icon-tag icon-lg mr-1" id="${category.id}"></i>
                            ${category.name}
                        </h4>
                        <div class="flex-fill"></div>
                    </div>
                    <div class="row">
                        ${categoryWebsites.map(site => createWebsiteCard(site)).join('')}
                    </div>
                `;
                
                contentDiv.append(categorySection);
            }
        }
    });
}

function createWebsiteCard(site) {
    return `
        <div class="url-card col-6  col-sm-6 col-md-4 col-xl-5a col-xxl-6a">
            <div class="url-body default">
                <a href="${site.url}" target="_blank" data-id="" data-url="${site.url}"
                    class="card no-c mb-4" data-toggle="tooltip" data-placement="bottom" 
                    data-original-title="${site.description}">
                    <div class="card-body">
                        <div class="url-content d-flex align-items-center">
                            <div class="url-img mr-2 d-flex align-items-center justify-content-center">
                                <img class="lazy" src="${site.icon}" data-src="${site.icon}"
                                    onerror="javascript:this.src='assets\\/images\\/logos\\/default.webp'" alt="${site.name}">
                            </div>
                            <div class="url-info flex-fill">
                                <div class="text-sm overflowClip_1">
                                    <strong>${site.name}</strong>
                                </div>
                                <p class="overflowClip_1 m-0 text-muted text-xs">${site.description}</p>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="${site.url}" class="togo text-center text-muted is-views" data-id="689"
                    data-toggle="tooltip" data-placement="right" title="直达" rel="nofollow">
                    <i class="iconfont icon-goto"></i>
                </a>
            </div>
        </div>
    `;
}
