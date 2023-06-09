import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImages = async (images: any, title: string, imgCount: number, catecory: string): Promise<any> => {
    const imageUrlPromises: Promise<string>[] = [];
    const allowedExtensions = ['.jpg', '.png', 'jpeg'];
    const fileExtension = images.map((e: { name: string; }) => e.name.substring(e.name.lastIndexOf('.')).toLowerCase());

    if (fileExtension.length > imgCount) {
        return alert(`이미지는 ${imgCount}장 이하만 가능합니다.`);
    }

    for (const e of fileExtension) {
        if (!allowedExtensions.includes(e)) {
            return alert('확장자는 jpg, png, jpeg만 지원합니다.');
        }
    }

    const date = new Date()
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const storageRef = ref(storage, `${catecory}/${date.getFullYear()}.${date.getMonth()}/${catecory}_${date.getDate()}_${title}${i}.png`);
        try {
            await uploadBytes(storageRef, image);
            const imageUrlPromise = getDownloadURL(storageRef);
            imageUrlPromises.push(imageUrlPromise);
        } catch (error) {
            alert('에러가 발생했습니다. 새로고침 후 다시 시도해주세요.' + error);
            throw new Error('이미지 업로드 중 오류가 발생했습니다.');
        }
    }

    const imageUrls = await Promise.all(imageUrlPromises);
    return imageUrls;
};