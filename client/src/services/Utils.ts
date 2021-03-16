import {Platform} from 'react-native'
import Colors from "../constants/Colors";

export default {
    getFirstLettersAsciiSum(value: string): number {
        if (!value) return 0;

        let words = value.split(' ');
        words = words.filter(w => w !== '');
        if (words.length === 1) {
            return words[0].charCodeAt(0);
        }
        return words[0].charCodeAt(0) + words[1].charCodeAt(0);
    },
    getFirstLetters(value: string): string {
        if (!value) return '';

        let words = value.split(' ');
        words = words.filter(w => w !== '');
        if (words.length === 1) {
            return `${words[0].charAt(0).toUpperCase()}`;
        }
        return `${words[0].charAt(0).toUpperCase()}${words[1]
            .charAt(0)
            .toUpperCase()}`;
    },

    getUserColor(name: string): string {
        const firstLettersSum = this.getFirstLettersAsciiSum(name);
        return Colors.profileColors[+firstLettersSum % Colors.profileColors.length];
    },
    createFormDataChangeProfile: (values: any) => {
        const formData = new FormData();
        if (values.thumbnail) {
            const imageUri = Platform.OS === 'android' ? values.thumbnail.uri : values.thumbnail.uri.replace('file://', '');
            const imageMime = imageUri.substr(imageUri.lastIndexOf('.') + 1);
            formData.append('thumbnail', {
                uri: imageUri,
                type: `image/${imageMime}`,
                name: `image.${imageMime}`
            } as any);
        }
        formData.append('first_name', values.first_name)
        formData.append('last_name', values.last_name)
        return formData;
    }
}
