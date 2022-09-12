import axios from 'axios';
import React, {useState} from 'react';
import './App.css';



function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details,setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
    getDetails();
  }
  
  function searchRepos() {
    setLoading(true);
    axios({
      methode:"get",
      url:"https://api.github.com/repos/1-grid/GitIntegration/issues",
    }).then(res => {
      console.log(res.data);
      setLoading(false);
      setRepos(res.data);
    })
  }

  function renderRepo(repo) {
    return (
      <div className="container" onClick={() => getDetails(repo.name)} key={repo.id}>
       <table className="table">
       <thead>
       <tr>
            <th scope="col">Number</th>
            <th scope="col">Title</th>
            <th scope="col">Description Body</th>
            <th scope="col">Client</th>
            <th scope="col">Priority</th>
            <th scope="col">Type</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{repo.id}</td>
            <td>{repo.title}</td>
            <td>{details.description}</td>
            <td>{details.client}</td>
            <td>{details.priority}</td>
            <td>{repo.user.type}</td>
            <td>{repo.user.login}</td>
            <td>{repo.state}</td>
        </tr>
        </tbody>
        </table>
      </div>
    )

  }
  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      methode: "get",
      url: `https://api.github.com/repos/1-grid/GitIntegration/issues/32/labels`,
    }).then(res => {
      setDetailsLoading(false);
      setDetails(res.data);
      console.log(res.data);
    });
  }


  return (
    <div className="page">
     <div className="landing-page-container">
      <div className="left-side">
        <form className="form">
          <input
            type="text"
            value={username}
            placeholder="Github 1 Grid"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>{loading? "Searching..." : "Search"}</button>
        </form>
        <div className="results-container">
            {repos.map(renderRepo)}
        </div>
      </div>

     </div>
    </div>
  );
}

export default App;
