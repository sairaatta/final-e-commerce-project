import React from 'react'
import MenCategory from "../assets/Images/maleCategory.jpg";
import WomenCategory from "../assets/Images/women.jpg";
import kidsCategory from "../assets/Images/kids.jpg";


const CategorySection = () => {


    const Categories =[
        {
            title:"Men",
            imageUrl : MenCategory,
        },
        {
            title:"Women",
            imageUrl : WomenCategory,
        },
        {
            title:"Kids",
            imageUrl : kidsCategory,
        },
    ];
  return (
    <div className='container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 '>
        {Categories.map((category, index) => (
            <div key={index} className='relative h-64 tranffornm transition-transform duration-300 hover:scale-105 cursor-pointer'>
                <img src={category.imageUrl} alt={category.title} className='w-full h-full
                 object-cover rounded-lg shahdow-md'/>  
                <div className='absolute top-20 left-12 '>
                <h2 className='text-x1 font-bold'>{category.title}</h2>
                <p className='text-gray-300 '>View All </p>
            </div>
            </div>
        ))}
    </div>
  )
}

export default CategorySection;  