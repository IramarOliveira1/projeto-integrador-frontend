import { notification } from 'ant-design-vue';


export default function notifications(status, message) {
    switch (status) {
        case 200:
        case 201:
            notification['success']({
                description: message,
            });
            break;
        case 400:
        case 401:
        case 403:
        case 404:
            notification['warning']({
                description: message,
            });
            break;

        default:
            notification['error']({
                description: 'Não foi possível executar essa ação',
            });
            break;
    }
}