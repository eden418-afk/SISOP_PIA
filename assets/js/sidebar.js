
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;
        // Reinitialize the sidebar behavior after injection
        initializeSidebar();
    });

// Function to initialize sidebar behavior
function initializeSidebar() {
    var $sidebar = $('#sidebar'),
        $sidebar_inner = $sidebar.children('.inner');

    // Inactive by default on <= large.
    breakpoints.on('<=large', function () {
        $sidebar.addClass('inactive');
    });

    breakpoints.on('>large', function () {
        $sidebar.removeClass('inactive');
    });

    // Toggle sidebar
    $('<a href="#sidebar" class="toggle">Toggle</a>')
        .appendTo($sidebar)
        .on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $sidebar.toggleClass('inactive');
        });

    // Event listeners for sidebar clicks
    $sidebar.on('click', 'a', function (event) {
        if (breakpoints.active('>large')) return;
        event.preventDefault();
        event.stopPropagation();
        var $a = $(this), href = $a.attr('href'), target = $a.attr('target');
        if (!href || href == '#' || href == '') return;
        $sidebar.addClass('inactive');
        setTimeout(function () {
            if (target == '_blank') window.open(href);
            else window.location.href = href;
        }, 500);
    });

    $body.on('click touchend', function (event) {
        if (breakpoints.active('>large')) return;
        $sidebar.addClass('inactive');
    });
}
