"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
    setSearchedPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (text) {
      const filtered = posts.filter((post) => {
        const idMatch = post.creator
          ? post.creator.username.includes(text)
          : false;
        const promptMatch = post.prompt ? post.prompt.includes(text) : false;
        const tagMatch = post.tag ? post.tag.includes(text) : false;
        return idMatch || promptMatch || tagMatch;
      });

      setSearchedPosts(filtered);
    } else {
      setSearchedPosts(posts);
    }
  };

  const handleTagClick = (tag) => {
    const filtered = posts.filter((post) => {
      return post.tag === tag;
    });

    setSearchedPosts(filtered);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a username, tag, or prompt content"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
