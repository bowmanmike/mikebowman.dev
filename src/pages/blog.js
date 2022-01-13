import React from 'react';
import { Link, graphql } from 'gatsby';

import Pagination from '../components/Pagination';

const homeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const Blog = ({ data, pageContext }) => {
  const { posts } = data.blog;
  return (
    <div className="p-2 m-4 border border-gray-400 shadow-md lg:p-4 lg:m-0">
      <h2 className="pr-8 mb-4 max-w-max text-2xl text-center border-b-4 border-sage">
        All Posts
      </h2>
      <Link
        to="/"
        className="block py-2 px-4 mb-4 w-full border border-gray-400 shadow-md md:mx-auto md:w-2/3 hover:bg-sage-100"
      >
        <p className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Go Back Home
        </p>
      </Link>

      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.blog.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/blog"
      />
      {posts.map(post => {
        const { slug } = post.frontmatter;
        return (
          <Link key={slug} to={`/blog/${slug}`}>
            <div className="p-2 lg:p-4">
              <div className="pr-8 max-w-max border-b-2 border-sage">
                <p className="text-lg italic font-medium">
                  {post.frontmatter.title}
                </p>
                <p className="italic">Published {post.frontmatter.date}</p>
              </div>
              <p>{post.excerpt}</p>
              <p className="text-sm">Continue Reading...</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 10) {
    blog: allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $pageSize
    ) {
      totalCount
      posts: nodes {
        id
        frontmatter {
          title
          slug
          date(formatString: "YYYY-MM-DD")
        }
        excerpt
      }
    }
  }
`;

export default Blog;
