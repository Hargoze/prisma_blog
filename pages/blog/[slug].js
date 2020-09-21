import { PrismaClient } from '@prisma/client';
import { Box, Heading, Text, Button, Link } from '@chakra-ui/core';
import fs from 'fs'
import path from 'path'
import PostMarkdown from "../../components/post-markdown"

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const post = await prisma.post.findOne({
    where: {
      slug: params.slug
    }
  });
  const content = fs
    .readFileSync(path.join("posts/", post.content))
    .toString();
  return {
    props: {
      post,
      content
    }
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  };
}

export default ({ post, content }) => {

  return (
    <Box mt={8}>
      <Heading fontWeight="800">{post.titre}</Heading>
      <PostMarkdown content={content} />
      <Link href="/">
      <Button>Back to home</Button>
      </Link>
    </Box>
  );
}
