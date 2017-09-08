
/** Holds the primary data used on this page: metadata about Swift Evolution proposals. */
var proposals

var REPO_PROPOSALS_BASE_URL = 'https://github.com/apple/swift-evolution/blob/master/proposals'


init()

/** Primary entry point. */
function init () {
    
    var req = new XMLHttpRequest();
    
    req.addEventListener('load', function (e) {
        
        proposals = JSON.parse(req.responseText)
    
        render()
    })
    
    req.open('get', 'json.json');
    req.send();
}

/**
 * Adds the dynamic portions of the page to the DOM, primarily the list
 * of proposals and list of statuses used for filtering.
 *
 * These `render` functions are only called once when the page loads,
 * the rest of the interactivity is based on toggling `display: none`.
 */
function render () {
  renderBody()
}

/** Displays the main list of proposals that takes up the majority of the page. */
function renderBody () {
  var article = document.querySelector('article')

  var proposalAttachPoint = article.querySelector('.proposals-list')



      proposals.map(function (proposal) {
          
      var proposalBody = 
          
            html('h4', { className: 'proposal-title' }, proposal.title )

      proposalAttachPoint.appendChild(proposalBody)
    })


  return article
}

    

    
    
