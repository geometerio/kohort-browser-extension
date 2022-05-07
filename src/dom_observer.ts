export default class DomObserver {
  onElementMutation(mutationHandler: (el: HTMLElement) => void) {
    new MutationObserver(function (mutations) {
      mutations.forEach(handleMutationEvents);
    }).observe(document, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    const handleMutationEvents = function handleMutationEvents(
      mutation: MutationRecord
    ) {
      [...mutation.addedNodes]
        .filter(nodeIsElement)
        .forEach((el) => mutationHandler(el));
    };

    function nodeIsElement(node: Node): node is HTMLElement {
      return typeof (<HTMLElement>node).querySelectorAll !== "undefined";
    }
  }
}
