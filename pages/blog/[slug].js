import { PrismaClient } from '@prisma/client';
import { Box, Heading, Text, Button, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const post = await prisma.post.findOne({
    where: {
      slug: params.slug
    }
  });
  return {
    props: {
      post
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

export default ({ post }) => (
  <Box mt={8}>
    <Heading fontWeight="800">{post.titre}</Heading>
    <Text>{post.content}</Text>
    <Link href="/">
    <Button>Back to home</Button>
    </Link>
  </Box>
);
