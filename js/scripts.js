$j = jQuery.noConflict();
/*
 * Theme palette switcher.
 */
(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = theme => {
        const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
        const headerSvgBg = document.querySelector('#header-bottom path')
        const footerSvgTop = document.querySelector('svg#svg-footer-top path')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
        })

        if( theme == 'dark' || ( theme == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches ) ) {
            headerSvgBg.setAttribute('fill', '#212529')
            if( footerSvgTop ) {
                footerSvgTop.setAttribute('fill', '#212529')
            }
        } else {
            headerSvgBg.setAttribute('fill', '#ffffff')
            if( footerSvgTop ) {
                footerSvgTop.setAttribute('fill', '#ffffff')
            }
        }

        btnToActive.classList.add('active')
        activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    localStorage.setItem('theme', theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                })
            })
    })
})()
$j(document).ready(function(){
    $j=jQuery.noConflict();

    /*
     * Make featured posts clickable.
     */
    $j(document).on('click', '#btemplates-1 .col-12', function(e){
        if( $j(this).find('.post-title a').length )
            window.location = $j(this).find('.post-title a').attr('href');
    });

    //Empty search string
    $j(".search-form button").on( "click", function(){
        var search = $j(this).parent().siblings("input");
        if( search.val() === "" ) {
            search.focus();
            return false;
        }
    } );


    /*
     * Particles plugin initialization.
     */
    Particles.init({
        selector: '.header-particles',
        color: '#ffffff',
        maxParticles: 130,
        connectParticles: false,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 80
                }
            }, {
                breakpoint: 375,
                options: {
                    maxParticles: 50
                }
            }
        ]
    });

    // Drop down menu
    $j(function() {
        $j("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Show the submenu.
            $j(this).siblings().toggleClass("show");

            // Hide other submenus if this one is shown.
            if (!$j(this).next().hasClass('show')) {
                $j(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            // Hide submenus when the main dropdown is hidden.
            $j(this).parents('li.nav-item.dropdown').on('hide.bs.dropdown', function(e) {
                $j('.dropdown-submenu .show').removeClass("show");
            });

        });
    });

    // Focus on search field when activating the search modal.
    $j('#searchModal').on('shown.bs.modal', function () {
        $j('#searchModal input[name="q"]').trigger('focus');
    });
    // Current year on the footer.
    var btDate = new Date();
    $j('#this-year').text(btDate.getFullYear());
    //Back to top
    $j(window).scroll(function () {
        $j(this).scrollTop() > 400 ? $j("#back-top").fadeIn() : $j("#back-top").fadeOut()
    });
    $j("#back-top").click(function () {
        return $j("body,html").animate({scrollTop: 0}, 800), !1
    });
    
})
