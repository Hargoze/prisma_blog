import { PrismaClient } from '@prisma/client';
import { List, Heading, Text, Link, ListItem } from '@chakra-ui/core';

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: { artist: true }
  });
  const blog = await prisma.blog.findMany()
  const posts = await prisma.post.findMany()

  return {
    props: {
      songs,
      posts
    }
  };
}

export default ({ posts }) => (
  <>
    <Heading mt={8} mb={4} fontWeight="800">
      My Blog
    </Heading>
    <List>
      {posts.map((post) => (
        <ListItem>
          <Link href={`blog/${post.slug}`} >{post.titre}</Link>
        </ListItem>
      ))}
    </List>
  </>
);