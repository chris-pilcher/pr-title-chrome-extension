// Represents information from the page
const page = {
  get titleInput() {
    return $("input[placeholder='Enter a title']");
  },
  get sourceBranchName() {
    return $.url().param("sourceRef");
  },
  get targetBranchName() {
    return $.url().param("targetRef");
  },
  get isPullRequestCreatePath() {
    return $.url()
      .attr()
      .path.endsWith("pullrequestcreate");
  }
};

// Updates the title of the pull request
function updateTitle() {
  page.titleInput.val(`${page.sourceBranchName} to ${page.targetBranchName}`);

  // The follow two lines are required to change the value of an input made with reactjs.
  // See: https://stackoverflow.com/questions/54137836/change-value-of-input-made-with-react-from-chrome-extension/54138182
  page.titleInput[0].dispatchEvent(new Event("change", { bubbles: true }));
  page.titleInput[0].dispatchEvent(new Event("blur", { bubbles: true }));
}

// Called when changes are made to the DOM tree.
function handleMutation() {
  if (!page.isPullRequestCreatePath) return;

  const generateButtonNotVisible = !$("#generatePRTitle").length;
  if (generateButtonNotVisible) {
    const generateButton = $("<button class='bolt-button'>🖖</button>")
      .attr({ id: "generatePRTitle", title: "Generate PR title" })
      .click(updateTitle);

    page.titleInput.before(generateButton);
  }
}

const observer = new MutationObserver(handleMutation);
observer.observe(document.body, { attributes: true, childList: true, characterData: true });
