import { notification } from 'ant-design-vue';

export default function notifications(status, message) {
    switch (status) {
        case 200:
        case 201:
            notification['success']({
                description: message,
            });
            break;

        case 401:
            if (message) {
                notification['warning']({
                    description: message,
                });

            } else {
                notification['warning']({
                    description: "TOKEN INV�LIDO!",
                });
            }

            break;

        case 400:
        case 403:
        case 404:
            notification['warning']({
                description: message,
            });
            break;

        default:
            notification['error']({
                description: 'N�o foi poss�vel executar essa a��o',
            });
            break;
    }
}