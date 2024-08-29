

const SingleBlog = ({params}) => {
    console.log(params)
    return (
        <div>
            This is blog with id {params.id}
        </div>
    );
};

export default SingleBlog;