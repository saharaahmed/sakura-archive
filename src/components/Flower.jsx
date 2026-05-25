function Flower({post, index}) {

    return (

        <div className="flower" onClick={() => alert(post.title)}
        style={{ left: `${index * 10}%`, top: `${index * 10}%` }}
        
        onClick={() => alert(post.title)}
        >
            <img src="/flower.png" alt="Flower" className="flower-image" />

        </div>
    )
}

export default Flower