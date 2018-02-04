const searchUrl = "https://api.github.com/search/repositories?q="
const commitsUrl = "https://api.github.com/repos/"

$(document).ready(function (){
});

function searchRepositories() {
  let input = document.getElementById('searchTerms').value;
  console.log(input);
  $.get(`${searchUrl}${input}`, function(response) {
    console.log(response);
    let results = '<ul>'
    response.items.forEach(function(element){
      item = `<li><h1><a href='${element.html_url}'>${element.name}</a></h1>
      <h3>${element.description}</h3><br>
      <img src="${element.owner.avatar_url}" width="25" height="25"><a href='${element.owner.html_url}'>Created By ${element.owner.login}</a></br>
      <a href='#' data-repository='${element.name}' data-owner='${element.owner.login}' onclick='showCommits(this)'>Show Commits</a>
      </li></br>`
      results += item
      console.log(results)
    })
    results += '</ul>'
    console.log(results)
    document.getElementById('results').innerHTML = results
  })
}

function showCommits(user) {
  $.get(`${commitsUrl}${user.dataset.owner}/${user.dataset.repository}/commits`, function(response){
    let commits = '<ul>'
    response.forEach(function(element) {
      commit = `<li>SHA: ${element.sha}<br>Author: ${element.commit.author.name}<br><img src="${element.author.avatar_url}" width="32" height="32"/></li>`
      commits += commit
      console.log(commits)
    })
    commits += '</ul>'
    document.getElementById('details').innerHTML = commits
  }).fail(displayError)
}

function displayError(error) {
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}
