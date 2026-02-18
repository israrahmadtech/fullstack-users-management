const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadImg = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`${BACKEND_URL}/api/v1/upload/image`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log(data);
        
        return data;
    } catch (error) {
        console.log("Upload Error:", error);
        throw error;
    }
};
