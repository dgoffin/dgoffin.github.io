
/** Holds the primary data used on this page: metadata about Swift Evolution proposals. */
var proposals

var myObj, myJSON, text, obj;

//Storing data:

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

  var proposalPresentationOrder = [
    '.awaitingReview', '.scheduledForReview', '.activeReview', '.accepted',
    '.acceptedWithRevisions', '.implemented', '.returnedForRevision', '.deferred', '.rejected', '.withdrawn'
  ]

  proposalPresentationOrder.map(function (state) {
    var matchingProposals = proposals.filter(function (p) { return p.status && p.status.state === state })
    matchingProposals.map(function (proposal) {
      var proposalBody = html('section', { id: proposal.id, className: 'proposal ' + proposal.id }, [
        html('div', { className: 'status-pill-container' }, [
          html('span', { className: 'status-pill color-' + states[state].className }, [
            states[proposal.status.state].shortName
          ])
        ]),
        html('div', { className: 'proposal-content' }, [
          html('div', { className: 'proposal-header' }, [
            html('span', { className: 'proposal-id' }, [
              proposal.id
            ]),
            html('h4', { className: 'proposal-title' }, [
              html('a', {
                href: REPO_PROPOSALS_BASE_URL + '/' + proposal.link,
                target: '_blank'
              }, [
                proposal.title
              ])
            ])
          ])
        ])
      ])

      var detailNodes = []
      detailNodes.push(renderAuthors(proposal.authors))

      if (proposal.reviewManager.name) detailNodes.push(renderReviewManager(proposal.reviewManager))
      if (proposal.trackingBugs) detailNodes.push(renderTrackingBugs(proposal.trackingBugs))
      if (state === '.implemented') detailNodes.push(renderVersion(proposal.status.version))

      if (state === '.acceptedWithRevisions') detailNodes.push(renderStatus(proposal.status))

      if (state === '.activeReview' || state === '.scheduledForReview') {
        detailNodes.push(renderStatus(proposal.status))
        detailNodes.push(renderReviewPeriod(proposal.status))
      }

      if (state === '.returnedForRevision') {
        detailNodes.push(renderStatus(proposal.status))
      }

      var details = html('div', { className: 'proposal-details' }, detailNodes)

      proposalBody.querySelector('.proposal-content').appendChild(details)
      proposalAttachPoint.appendChild(proposalBody)
    })
  })

  // Update the "(n) proposals" text
  updateProposalsCount(article.querySelectorAll('.proposal').length)

  return article
}

    

    
    
