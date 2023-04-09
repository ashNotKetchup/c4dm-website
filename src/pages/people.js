import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import PeopleCard from "../components/peopleCard";


const People = () => {
    const data = useStaticQuery(graphql`
      {
        allMarkdownRemark(
          filter: { fields: { category: { eq: "people" } } }
          sort: { frontmatter: { role: DESC } }
        ) {
          nodes {
            frontmatter {
              image {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED)
                }
              }
              name
              role
              topic
            }
            id
          }
        }
      }
    `);
    return (
        <Layout name="People">
            <section className="section">
                <div className="columns is-multiline">
                    {data.allMarkdownRemark.nodes.map((peopleentry) => (
                        <div className="column is-one-quarter is-one-third-tabled is-full-mobile is-flex" key={peopleentry.id}>
                            <PeopleCard
                                name={peopleentry.frontmatter.name}
                                role={peopleentry.frontmatter.role}
                                topic={peopleentry.frontmatter.topic}
                                image={peopleentry.frontmatter.image.childImageSharp.gatsbyImageData}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}

export default People;