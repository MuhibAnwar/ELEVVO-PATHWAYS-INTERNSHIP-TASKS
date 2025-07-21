document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const mainContent = document.getElementById('mainContent');
    const sidebarLinks = document.querySelector('.sidebar-links');

    // Function to handle toggling the sidebar
    function toggleSidebar() {
        // Toggle the 'closed' class on the sidebar
        sidebar.classList.toggle('closed');

        // On desktop, shift the main content. On mobile, the sidebar overlays.
        if (window.innerWidth > 768) {
            mainContent.classList.toggle('shifted');
        } else {
            // For mobile, toggle the 'open' class
            sidebar.classList.toggle('open');
            // If sidebar is opening on mobile, ensure it removes 'closed'
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('closed');
            }
        }

        // Change the toggle button's icon direction
        const icon = toggleBtn.querySelector('i');
        if (sidebar.classList.contains('closed') || sidebar.classList.contains('open') && window.innerWidth <= 768) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        }

        // Adjust visibility of link texts based on sidebar state
        const linkSpans = sidebarLinks.querySelectorAll('li a span');
        linkSpans.forEach(span => {
            // Hide text if sidebar is closed OR if it's mobile and not explicitly 'open'
            if (sidebar.classList.contains('closed') || (window.innerWidth <= 768 && !sidebar.classList.contains('open'))) {
                span.style.display = 'none';
            } else {
                span.style.display = 'inline';
            }
        });
    }

    // Event listener for the toggle button
    toggleBtn.addEventListener('click', toggleSidebar);

    // Function to handle initial state and window resizing for responsiveness
    function handleResize() {
        if (window.innerWidth <= 768) {
            // On mobile:
            // Sidebar starts hidden (off-screen)
            sidebar.classList.add('closed'); // Forces 'closed' state for initial hidden state
            sidebar.classList.remove('open'); // Ensure 'open' is not lingering
            mainContent.classList.remove('shifted'); // Main content never shifts on mobile

            // Set toggle button icon to 'right' (indicating it's hidden)
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');

            // Hide all link texts
            sidebarLinks.querySelectorAll('li a span').forEach(span => {
                span.style.display = 'none';
            });

        } else {
            // On desktop:
            // Sidebar starts open (not 'closed')
            sidebar.classList.remove('closed');
            sidebar.classList.remove('open'); // Ensure 'open' isn't lingering from mobile
            mainContent.classList.remove('shifted'); // Ensure content is not shifted if sidebar starts open

            // Set toggle button icon to 'left' (indicating it's open)
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');

            // Show all link texts
            sidebarLinks.querySelectorAll('li a span').forEach(span => {
                span.style.display = 'inline';
            });
        }
    }

    // Call handleResize on initial load
    handleResize();

    // Call handleResize whenever the window is resized
    window.addEventListener('resize', handleResize);
});