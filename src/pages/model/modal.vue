<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Veiculo' : 'Cadastrar Veiculo'" :footer="null"
            width="800px">

            <a-form layout="vertical" ref="form" name="basic" :model="data" @finish="save" :hideRequiredMark="true">

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :xl="{ span: 24 }">
                        <a-form-item label="Nome" name="nome"
                            :rules="[{ required: true, message: 'Campo nome � obrigat�rio' }]">
                            <a-input v-model:value="data.nome" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :xl="{ span: 24 }">
                        <a-form-item label="Quantidade" name="quantidade">
                            <a-input v-model:value="data.quantidade" disabled />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-form-item label="Imagem" name="image"
                    :rules="[{ required: true, message: 'Campo imagem � obrigat�rio' }]">
                    <a-upload-dragger :before-upload="beforeUpload" list-type="picture" name="file" :max-count="1"
                        :multiple="false" v-model:fileList="fileList" @remove="removeImage"
                        :load="modalEdit ? getImage : null">

                        <p class="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p class="ant-upload-text">
                            Clique ou arraste o arquivo para esta �rea para fazer upload</p>
                        <p class="ant-upload-hint">
                            Arquivos do tipo (PNG, JPEG, JPG)
                        </p>
                    </a-upload-dragger>
                </a-form-item>

                <a-form-item class="ant-modal-footer">
                    <a-button key="back" @click="closeModal">Fechar</a-button>
                    <a-button type="primary" html-type="submit" v-if="!modalEdit">Cadastrar</a-button>
                    <a-button type="primary" html-type="submit" v-else>Atualizar</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>

import { InboxOutlined } from '@ant-design/icons-vue';

import { Upload } from 'ant-design-vue';

export default {
    components: {
        InboxOutlined,
    },
    props: ['openModal', 'idEdit', 'listImage'],
    data() {
        return {
            fileList: [],
            isActiveModal: false,
        }
    },
    computed: {
        showModal: {
            get() {
                return this.isActiveModal = this.openModal;
            },
        },
        getImage: {
            get() {
                return this.fileList = this.listImage;
            },
            set(newVal) {
                return newVal;
            }
        },

        modalEdit: {
            get() {
                return this.$store.getters['generic/getModalEdit'];
            },
        },

        data: {
            get() {
                return this.$store.getters['model/getData'];
            },
        },
    },


    methods: {
        removeImage() {
            this.$store.commit('model/setImage', null);
            this.fileList = [];
        },

        beforeUpload(image) {
            const types = [
                'image/png',
                'image/jpeg',
                'image/jpg',
            ];

            const filter = types.filter(type => type === image.type);

            if (filter.length === 0) {
                this.$notification.notification(400, `${image.name} n�o � um arquivo do tipo (PNG, JPEG OU JPG) `);

                return Upload.LIST_IGNORE;
            }

            this.getImage = image;
            this.$store.commit('model/setImage', image);

            return false;
        },
        async save(data) {
            try {
                delete data.image;

                if (this.modalEdit) {
                    this.update(data);

                    return;
                }

                const response = await this.$store.dispatch('model/save', data);

                this.$notification.notification(response.status, response.data.message);

                this.removeImage();

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await this.$store.dispatch('model/update', { id: this.$props.idEdit, data: data });

                this.$notification.notification(response.status, response.data.message);

                this.removeImage();

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        closeModal(close) {
            this.$refs['form'].clearValidate();

            this.$store.commit('model/clearForm', {
                nome: null,
                image: null,
            });

            this.removeImage();

            this.$emit('close', close);
        },
    },
}
</script>