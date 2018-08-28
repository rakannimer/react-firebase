/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ""}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : "") + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} alt="Project Logo" />
  </div>
);

const ProjectTitle = () => (
  <div>
    <img width={60} src={imgUrl("logo.png")} alt="Project Logo" />
    <h2 className="projectTitle">{siteConfig.title}</h2>
  </div>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || "";
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl("try-it-out.html", language)}>
              Try it out
            </Button>
          </PromoSection>
          <PromoSection>
            <Button
              href={docUrl(
                "react-firebase-auth/getting-started.html",
                language
              )}
            >
              Auth
            </Button>
            <Button
              href={docUrl(
                "react-firebase-realtime-database/getting-started.html",
                language
              )}
            >
              Realtime Database
            </Button>
            <Button
              href={docUrl(
                "react-firestore-database/getting-started.html",
                language
              )}
            >
              Firestore
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={["bottom", "top"]}
    id={props.id}
    background={props.background}
  >
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = () => (
  <Block layout="fourColumn">
    {[
      {
        content: `Don't worry about data subscription management, just set the path to your data.`,
        // image: imgUrl('logo.png'),
        // imageAlign: 'top',
        title: "Declarative "
      },
      {
        content: `No boilerplate, get straight to writing your app logic.`,
        // image: imgUrl('logo.png'),
        // imageAlign: 'top',
        title: "Simple, Component Based API"
      },
      {
        content: "Automatically re-use subscriptions across your app.",
        // image: imgUrl('logo.png'),
        // imageAlign: 'top',
        title: "Fast"
      },
      {
        content: "Works with React Native & rn-firebase.",
        // image: imgUrl('logo.png'),
        // imageAlign: 'top',
        title: "Cross Platform"
      }
    ]}
  </Block>
);

const FeatureCallout = () => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{ textAlign: "center" }}
  >
    <h2>Feature Callout</h2>
    <MarkdownBlock>These are features of this project</MarkdownBlock>
  </div>
);

const LearnHow = () => (
  <Block background="light">
    {[
      {
        content: "Talk about learning how to use this",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "right",
        title: "Learn How"
      }
    ]}
  </Block>
);

const TryOut = () => (
  <Block id="try">
    {[
      {
        content: "Talk about trying this out",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "left",
        title: "Try it Out"
      }
    ]}
  </Block>
);

const Description = () => (
  <Block background="dark">
    {[
      {
        content: "This is another description of how this project is useful",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "right",
        title: "Description"
      }
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>Who is Using This?</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl("users.html", props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || "";

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <div style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>
              <h2 style={{ textAlign: "center" }}>
                <a
                  href="https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-auth"
                  target="_blank"
                >
                  Auth Example
                </a>
              </h2>
              <iframe
                src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-auth"
                style={{
                  width: "100%",
                  height: 300,
                  border: 0,
                  borderRadius: 4,
                  overflow: "hidden"
                }}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
              />
            </div>
            <div style={{ width: "5%" }} />
            <div style={{ width: "30%" }}>
              <h2 style={{ textAlign: "center" }}>
                <a
                  href="https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-infinite-list"
                  target="_blank"
                >
                  Database Example
                </a>
              </h2>
              <iframe
                src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-infinite-list"
                style={{
                  width: "100%",
                  height: 300,
                  border: 0,
                  borderRadius: 4,
                  overflow: "hidden"
                }}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
              />
            </div>
            <div style={{ width: "5%" }} />
            <div style={{ width: "30%" }}>
              <h2 style={{ textAlign: "center" }}>
                <a
                  href="https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firestore-infinite-list"
                  target="_blank"
                >
                  Firestore Example
                </a>
              </h2>
              <iframe
                src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firestore-infinite-list"
                style={{
                  width: "100%",
                  height: 300,
                  border: 0,
                  borderRadius: 4,
                  overflow: "hidden"
                }}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
