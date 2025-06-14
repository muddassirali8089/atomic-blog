import { faker } from '@faker-js/faker';
import React, { createContext, useContext, useMemo, useState } from 'react'


function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();

function PostProviderContext({children}) {
      const [posts, setPosts] = useState(() =>
         Array.from({ length: 30 }, () => createRandomPost())
       );
       const [searchQuery, setSearchQuery] = useState("");
       
     
       // Derived state. These are the posts that will actually be displayed
       const searchedPosts =
         searchQuery.length > 0
           ? posts.filter((post) =>
               `${post.title} ${post.body}`
                 .toLowerCase()
                 .includes(searchQuery.toLowerCase())
             )
           : posts;
     
       function handleAddPost(post) {
         setPosts((posts) => [post, ...posts]);
       }
     
       function handleClearPosts() {
         setPosts([]);
       }


     const value = useMemo(() => ({
    posts: searchedPosts,
    onAddPost: handleAddPost,
    onClearPosts: handleClearPosts,
    searchQuery,
    setSearchQuery,
  }), [searchedPosts, searchQuery]);

return(

    <PostContext.Provider
      value={value}
    >
        {children}
    </PostContext.Provider>
)

}



function usePosts (){

    const context = useContext(PostContext);
    if(context === undefined) throw new Error("Post context is used in the parent you must used in the child of the provider.")
    return context;
}

export  {PostProviderContext , usePosts}