<template>
    <div>
        <a-modal v-model:open="showModal" :title="modalEdit ? 'Editar Veiculo' : 'Cadastrar Veiculo'" :footer="null"
            width="800px">

            <a-form layout="vertical" ref="form" name="basic" :model="{ ...data.agencia, ...data }" @finish="save"
                :hideRequiredMark="true">
                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Marca" name="marca"
                            :rules="[{ required: true, message: 'Campo marca ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.marca" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Modelo" name="modelo"
                            :rules="[{ required: true, message: 'Campo modelo ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.modelo" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Placa" name="placa"
                            :rules="[{ required: true, message: 'Campo placa ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.placa" v-mask="'AAA-####'" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Ano" name="ano"
                            :rules="[{ required: true, message: 'Campo ano ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.ano" type="number" min="0" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Cor" name="cor"
                            :rules="[{ required: true, message: 'Campo cor ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.cor" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Preço" name="valor_diaria"
                            :rules="[{ required: true, message: 'Campo valor da diaria ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.valor_diaria" v-money="money" />

                            {{ data.valor_diaria }}
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Capacidade" name="capacidade"
                            :rules="[{ required: true, message: 'Campo capacidade ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.capacidade" type="number" min="0" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Quantidade em estoque" name="quantidade"
                            :rules="[{ required: true, message: 'Campo quantidade ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.quantidade" type="number" min="0" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[8, 16]">
                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Categoria" name="categoria"
                            :rules="[{ required: true, message: 'Campo categoria ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.categoria" />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 12 }">
                        <a-form-item label="Agência" name="agencia"
                            :rules="[{ required: true, message: 'Campo agencia ï¿½ obrigatï¿½rio' }]">
                            <a-input v-model:value="data.agencia.id" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-form-item label="Imagem" name="image"
                    :rules="[{ required: true, message: 'Campo imagem ï¿½ obrigatï¿½rio' }]">
                    <a-upload-dragger :before-upload="beforeUpload" list-type="picture" name="file" :max-count="1"
                        :multiple="false" @change="removeImage">

                        <p class="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p class="ant-upload-text">
                            Clique ou arraste o arquivo para esta área para fazer upload</p>
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

import { VueTheMask } from 'vue-the-mask'
import { Money } from 'v-money'
import { InboxOutlined } from '@ant-design/icons-vue';

import { Upload } from 'ant-design-vue';


export default {
    components: {
        InboxOutlined,
        VueTheMask,
        Money
    },
    props: ['openModal', 'idEdit'],
    data() {
        return {
            description: null,
            money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false
            },
            isActiveModal: false,
        }
    },
    computed: {
        showModal: {
            get() {
                return this.isActiveModal = this.openModal;
            },
        },

        modalEdit: {
            get() {
                return this.$store.getters['generic/getModalEdit'];
            },
        },

        data: {
            get() {
                return this.$store.getters['vehicle/getData'];
            },
        }
    },
    methods: {
        removeImage(image) {
            if (image.fileList.length === 0) {
                this.$store.commit('vehicle/setImage', null);
            }
        },
        beforeUpload(image) {
            const types = [
                'image/png',
                'image/jpeg',
                'image/jpg',
            ];

            const filter = types.filter(type => type === image.type);

            if (filter.length === 0) {
                this.$notification.notification(400, `${image.name} não é um arquivo do tipo (PNG, JPEG OU JPG) `);

                return Upload.LIST_IGNORE;
            }

            this.$store.commit('vehicle/setImage', image);

            return false;
        },
        async save(data) {
            try {

                if (this.modalEdit) {
                    this.update(data);

                    return;
                }

                delete data.image;

                const response = await this.$store.dispatch('vehicle/save', data);

                this.$notification.notification(response.status, response.data.message);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        async update(data) {
            try {

                const response = await this.$store.dispatch('vehicle/update', { id: this.$props.idEdit, data: data });

                this.$notification.notification(response.status, response.data.message);

                this.closeModal();
            } catch (error) {
                this.$notification.notification(error.response.status, error.response.data.message);
            }
        },

        closeModal(close) {
            this.$refs['form'].clearValidate();
            // console.log(  this.$refs['form'].clearValidate());

            this.$store.commit('vehicle/clearForm', {
                ano: null,
                capacidade: null,
                categoria: null,
                valor_diaria: null,
                cor: null,
                marca: null,
                modelo: null,
                placa: null,
                quantidade: null,
                agencia: {
                    id: null
                },
                image: null
            });

            this.$emit('close', close);
        },
    },
}
</script>