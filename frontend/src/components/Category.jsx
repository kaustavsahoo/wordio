import react from 'react';

function Category({ data, name, onSelect }) {
    const emoji = data.emoji;

    return (
        <div className="m-2 flex flex-col w-xs cursor-pointer text-center border-solid border-4 hover:border-blue-500 rounded-lg bg-white p-5"
            onClick={() => onSelect(name)}>
            <p className="text-5xl">{emoji}</p>  
            <p className="mt-4 font-mono text-3xl">{name}</p>
        </div>
    )
}

export default Category;