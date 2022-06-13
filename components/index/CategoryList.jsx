import React, { useEffect } from "react";
import { CategoryCard } from "./CategoryCard";

const CategoryList = ({ data }) => {
  const topics = data.map((topic) => ({
    topic_name: topic.topic_name,
    uuid: topic.topic_code,
    topic_image: topic.topic_image,
  }));
  return (
    <section className="py-10 bg-white px-10">
      <h3 className="text-2xl my-5 font-bold">Top categories</h3>

      <div className="flex flex-wrap">
        {topics.map((topic) => (
          <CategoryCard key={topic.topic_name} data={topics} />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
