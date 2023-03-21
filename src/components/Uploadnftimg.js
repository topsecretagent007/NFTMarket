import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function App({ onImageChange }) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        onImageChange(imageList)
        setImages(imageList);
    };

    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => {
                    if (imageList.length > 0) {
                        localStorage.setItem("imgData", imageList[0].file);
                    }
                    return (
                        <div className="upload__image-wrapper text-center justify-between items-center">
                            <button className='block bg-[#edb731] py-1 px-4 my-3 rounded-full m-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </button>

                            <button className='block bg-[#edb731] py-1 px-4 rounded-full m-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300'
                                onClick={onImageRemoveAll}>Remove all images</button>
                            <div className='overflow-y-auto h-96 p-5 bg-[#121212] rounded-3xl'>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="50%" className='m-auto rounded-xl' />
                                        <div className="image-item__btn-wrapper m-auto">
                                            <button className='bg-[#edb731] py-1 m-3 px-4 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300' onClick={() => onImageUpdate(index)}>Update</button>
                                            <button className='bg-[#edb731] py-1 m-3 px-4 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300' onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }
                }
            </ImageUploading>
        </div>
    );
}
