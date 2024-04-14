$(function() {
  // Load the header
  $("#header").load("header.html", function() {
      // After the header is loaded, determine the current page and add the 'active' class
      setActiveClass();

      // Add event listener for the menu-icon
      addMenuIconEventListener();
  });

  // Load the footer
  $("#footer").load("footer.html");

  function setActiveClass() {
    // Get the current page's URL
    const currentPage = window.location.pathname.split('/').pop();

    // Loop through each navigation link in the loaded header
    $('#header nav ul li a').each(function() {
        // Check if the href of the link matches the current page
        if ($(this).attr('href') === currentPage) {
            // Add the 'active' class to the parent li element
            $(this).parent().addClass('active');
        }
    });
  }

  function addMenuIconEventListener() {
      document.getElementById('menu-icon').addEventListener('click', function() {
        const navItems = document.querySelectorAll('nav ul li:not(.active)');
        navItems.forEach(item => {
            if (item.style.display === 'block') {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
      });
  }
});