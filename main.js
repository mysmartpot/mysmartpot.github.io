(function() {
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

  // Callback that sets the `--intersection-ratio` property of observed
  // elements to the percentage of the element that is currently in the
  // viewport. The custom property is used in CSS to animate content
  // containers.
  function revealIntersected(entries) {
    for (const entry of entries) {
      entry.target.style.setProperty('--intersection-ratio', entry.intersectionRatio)
    }
  }

  // Create an intersection observer for elements that should be revealed when
  // they are scrolled into view.
  const observer = new IntersectionObserver(revealIntersected, {
    threshold: Array.from({length: 100}, (value, key) => 1 - key / 100)
  });
  const revealables = document.querySelectorAll('.revealable');
  for (const revealable of revealables) {
    observer.observe(revealable);
  }
})();
