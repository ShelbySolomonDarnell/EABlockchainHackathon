import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <div class="inner">
          <header>
          <h1>Kweli Wallet</h1><br/>
          </header>
          <section class="tiles">
            <article class="style1">
              <span class="image">
                <img src="images/pic10.jpg" alt="" />
              </span>
              <a href="generic.html">
                <h2>Demographics</h2>
                <div class="content">
                  <p>Choose defining data</p>
                </div>
              </a>
            </article>
            <article class="style2">
              <span class="image">
                <img src="images/biomodality.jpg" alt="" />
              </span>
              <a href="generic.html">
                <h2>Biometrics</h2>
                <div class="content">
                  <p>Pick your modalities</p>
                </div>
              </a>
            </article>
          </section>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('main')
)