import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import "../style/bulmacustom.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "../components/layout.js";
import Carousel from "../components/carousel";
import BlogCard from "../components/blogCard";
import Video from "../components/video";
import ParallelogramHeader from "../components/parallelogramHeader";

const IndexPage = ({pageContext}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const data = useStaticQuery(graphql`
      {
        about: markdownRemark(
          fields: { category: { eq: "about" } }
          fileAbsolutePath: { regex: "/about-long.md/" }
        ) {
          html
          frontmatter {
            title
            video
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 400)
              }
            }
          }
        }
        projects: allMarkdownRemark(
          filter: { fields: { category: { eq: "projects" } } }
          sort: { frontmatter: { end: DESC } }
          limit: 6
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              image {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
                }
              }
              title
              author
              date(formatString: "ddd DD MMM yy")
            }
            html
            id
          }
        }
        news: allMarkdownRemark(
          filter: { fields: { category: { eq: "news" } } }
          sort: { frontmatter: { date: DESC } }
          limit: 6
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              image {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
                }
              }
              title
              author
              date(formatString: "ddd DD MMM yy")
            }
            html
            id
          }
        }
      }
    `);

    const projectCards = data.projects.nodes.map((project) => (
      <BlogCard
        title={project.frontmatter.title}
        author={project.frontmatter.author}
        date={project.frontmatter.date}
        image={project.frontmatter.image.childImageSharp.gatsbyImageData}
        html={project.html}
        slug={project.fields.slug}
      />
    ));

    const newsCards = data.news.nodes.map((news) => (
      <BlogCard
        title={news.frontmatter.title}
        author={news.frontmatter.author}
        date={news.frontmatter.date}
        image={news.frontmatter.image.childImageSharp.gatsbyImageData}
        
        slug={news.fields.slug}
      />
    ));

    const homeHero = (
      <section className="hero is-link is-fullheight">
        <div className="hero-body has-background-primary">
          <div className="columns is-multiline">
            <div className="column is-one-third-desktop is-full-tablet">
              <ParallelogramHeader text="About Us" backgroundColor="white" textColor="primary"/>

              <div
                dangerouslySetInnerHTML={{ __html: data.about.html }}
                className="pt-6 pr-6 is-size-4-desktop is-size-5-mobile has-text-justified has-text-white"
              ></div>
            </div>
            <div className="column is-two-thirds-desktop is-full-tablet">
              <Video videoSrcURL={data.about.frontmatter.video} />
            </div>
          </div>
          {/* ADD HERO IMAGE! */}
          {/* <br></br>
          <p class="subtitle">C4DM</p> */}
        </div>
      </section>
    );

  return (
    <Layout name="Homepage" hero={homeHero}>
      <section className="section">
        <div className="lowerPadding">
          <div className="column is-one-third">
            <ParallelogramHeader text="Projects" backgroundColor="primary" textColor="white"/>

          </div>
        </div>
        <div className="container">
          <Carousel content={projectCards} />
        </div>
      </section>

      <section className="secondary">
        <div className="lowerPadding">
          <div className="column is-one-third">
          <ParallelogramHeader text="News" backgroundColor="white" textColor="black"/>
          </div>
        </div>

        <div className="container">
          <Carousel content={newsCards} />
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage

export const Head = () => <title>Home Page</title>