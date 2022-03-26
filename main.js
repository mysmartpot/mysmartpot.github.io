(function() {
  // Modify anchors such that they can be clicked.
  const anchors = document.querySelectorAll('a[name]');
  for (const anchor of anchors) {
    anchor.href = `#${anchor.name}`;
  }

  // Modify links to anchors such that elements are smoothly scrolled into view.
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  for (const link of internalLinks) {
    link.addEventListener('click', (event) => {
      const targetName = link.getAttribute('href').substring(1);
      const targets = targetName.length === 0
        ? [document.body]
        : document.getElementsByName(targetName);
      if (targets.length > 0) {
        targets[0].scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', link.href);
        event.preventDefault();
      }
    });
  }

  // Modify links to external sites such that they are opened in a new tab.
  const externalLinks = document.querySelectorAll('a[href^="https://"]');
  for (const link of externalLinks) {
    link.target = '_blank';
  }
})();
