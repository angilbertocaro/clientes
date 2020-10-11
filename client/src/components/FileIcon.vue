<template>
    <div class="is-sortable-disabled is-readonly has-multiple is-drag-valid theme-list">
        <div class="grid-block-wrapper vue-file-agent file-input-wrapper has-multiple">
            <div v-for="(file, index) in files" :key="index" class="file-preview-wrapper grid-box-item grid-block">
                
                <!-- Archivos PDF -->
                <span v-if="Ext(file) == 'pdf'" class="file-preview other-preview" style="background-color: rgb(193, 30, 7);">   
                    <a :href="Img(file)" target="_blank">                 
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M46.2 21.8c-3.5 0-6.3 2.9-6.3 6.3 0 4.3 2.4 9.6 4.9 14.7-2 6.1-4.1 12.7-7 18.2-5.8 2.3-11 4-14 6.6l-.2.2c-1.1 1.2-1.8 2.7-1.8 4.4 0 3.5 2.9 6.3 6.3 6.3 1.7 0 3.4-.6 4.4-1.8 0 0 .2 0 .2-.2 2.3-2.7 5-7.8 7.5-12.2 5.5-2.1 11.5-4.4 16.9-5.8 4.1 3.4 10.1 5.5 15 5.5 3.5 0 6.3-2.9 6.3-6.3 0-3.5-2.9-6.3-6.3-6.3-4 0-9.6 1.4-13.9 2.9-3.5-3.4-6.7-7.5-9.2-11.9C50.6 37 52.6 32 52.6 28c-.2-3.5-2.9-6.2-6.4-6.2zm0 3.6c1.4 0 2.4 1.1 2.4 2.4 0 1.8-1.1 5.3-2.1 9-1.5-3.7-2.9-7.2-2.9-9 .1-1.2 1.2-2.4 2.6-2.4zm1.1 21.5c1.8 3.1 4.1 5.8 6.6 8.2-3.7 1.1-7.3 2.3-11 3.7 1.8-3.8 3.1-7.9 4.4-11.9zM72 55c1.4 0 2.4 1.1 2.4 2.4 0 1.4-1.1 2.4-2.4 2.4-2.9 0-6.9-1.2-10.1-3.1C65.6 56 69.7 55 72 55zM34.6 66.2c-1.8 3.2-3.5 6.1-4.7 7.6-.5.5-.9.6-1.7.6-1.4 0-2.4-1.1-2.4-2.4 0-.6.3-1.4.6-1.7 1.3-1.2 4.5-2.6 8.2-4.1z">
                            </path>
                        </svg>                            
                    </div>
                    </a>
                </span>

                <!-- Archivos de Excel -->
                <span v-else-if="Ext(file) == 'xlsx' || Ext(file) == 'xlsm' || Ext(file) == 'xls' || Ext(file) == 'ods'" class="file-preview other-preview" style="background-color: rgb(48, 114, 63);">                    
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M62.1 30.9h14.1v9.4H62.1zm0 14.5h14.1v9.4H62.1zm0 14.3h14.1v9.4H62.1zm-19.2 0H57v9.4H42.9zm-19 0H38v9.4H23.9zm19.2-14.2h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9zm19.2-14.6h14.1v9.4H43.1zm-19.2 0H38v9.4H23.9z">
                            </path>
                        </svg>
                    </div>
                    </a>
                </span>

                <!-- Archivos de Word -->
                <span v-else-if="Ext(file) == 'docx' || Ext(file) == 'doc' || Ext(file) == 'odt'" class="file-preview other-preview" style="background-color: rgb(35, 114, 186);">                    
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100"><path d="M29.6 53l-5.9-18.2c-.2-.7-.4-1-.5-1-.1-.1-.2-.1-.4-.2l-2.1-.6-.1-2.6h11l.2 2.6-2.1.6v.2c0 .2.1.7.4 1.2l2.2 7 3.9-11.7 3-.1 3.6 11.7 2.5-7c.1-.5.4-1 .4-1.2v-.1l-1.8-.5-.1-2.7h8.6l.2 2.6-2.3.7c-.1 0-.2.1-.4.1 0 .1-.2.2-.4.9L43 52.8l-3.1.2-3.3-11.2-3.9 11-3.1.2z">
                            </path>
                            <path d="M57.8 30.2h21.7v3.4H57.8zm0 9.2h21.7v3.4H57.8zm0 9.4h21.7v3.4H57.8zm-36.2 9.6h57.9v3.4H21.6zm0 9.4h57.9v3.4H21.6z">
                                </path>
                        </svg>
                    </div>
                    </a>
                </span>

                <!-- Archivos de Power Point -->
                <span v-else-if="Ext(file) == 'pptx' || Ext(file) == 'ppt' || Ext(file) == 'odp'" class="file-preview other-preview" style="background-color: rgb(194, 79, 50);">                    
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M 73.319289,26.32707 H 26.61477 c -2.335226,0 -4.258353,1.917194 -4.258353,4.245215 v 29.853446 c 0,2.328021 1.923127,4.245215 4.258353,4.245215 h 19.506006 l -1.923128,7.257947 h -2.197859 c -0.961564,0 -1.648395,0.684712 -1.648395,1.643309 0,0.958597 0.686831,1.643309 1.648395,1.643309 h 15.797117 c 0.961563,0 1.648394,-0.684712 1.648394,-1.643309 0,-0.958597 -0.686831,-1.643309 -1.648394,-1.643309 H 55.46168 l -1.923128,-7.39489 h 19.780737 c 2.335226,0 4.258353,-1.917193 4.258353,-4.245214 V 30.572285 c 0,-2.328021 -1.923127,-4.245215 -4.258353,-4.245215 z m 0.412099,34.372546 H 26.202672 V 30.2984 h 47.39135 z">
                            </path>
                            <path d="m 38.428266,48.511741 h 3.846255 v 7.668775 h -3.846255 z m 6.456214,-2.464963 h 3.846254 V 56.180516 H 44.88448 Z m 6.318846,-2.601906 h 3.846255 v 12.735644 h -3.846255 z m 6.318847,-2.464964 h 3.846255 v 15.200608 h -3.846255 z m -0.274732,-5.614639 -6.730946,3.697445 -4.945184,-1.643308 -8.379341,4.519099 1.236296,1.369424 7.417777,-3.834387 4.945185,1.643309 7.692509,-4.245215 1.236296,1.369424 2.88469,-4.792984 -6.593578,0.410827 z">
                            </path>
                        </svg>
                    </div>
                    </a>
                </span>

                <!-- Archivos de Comprimidos -->
                <span v-else-if="Ext(file) == 'zip' || Ext(file) == 'rar'" class="file-preview other-preview" style="background-color: rgb(186, 131, 34);">                    
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M72.4 38.5h-7.9v-7.9l7.9 7.9zm-21.3-7.9v28.8h21.4v-19h-9.9v-9.9H51.1zm3.3-7.6H30.8v5.6h9.3l-5.9 4.5v4.8l8.6-6.6v-2.7h30.1v-2.3L54.4 23zM42.9 35.1l-8.6 6.6v4.8l8.6-6.6v-4.8zm-8.7 20l8.6-6.6v-4.8l-8.6 6.6v4.8zm8.7 2v-4.8l-8.6 6.6v2.6h-3.4v5.6h5.3v3.8H33c-.6-1-1.6-1.6-2.8-1.6-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1.2 0 2.2-.6 2.8-1.6h3.1V77h4.8v-2.9H44c.6 1 1.6 1.6 2.8 1.6 1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2c-1.2 0-2.2.6-2.8 1.6h-3.1v-3.8h13.5l18.5-3.3v-2.3H37.1l5.8-4.4z">
                            </path>
                        </svg>
                    </div>
                    </a>
                </span>

                <!-- Archivos de Programacion -->
                <span v-else-if="Ext(file) == 'xml' || Ext(file) == 'html' || Ext(file) == 'json' || Ext(file) == 'js' || Ext(file) == 'java' || Ext(file) == 'php' || Ext(file) == 'sql'" class="file-preview other-preview" style="background-color: rgba(136, 121, 119, 0.75);">                    
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M21.5 48.3l16.2-14v7.1l-11 9.2v.1l11 9.2V67L21.5 53v-4.7zm30.6-17.6h4.3L48 71.3h-4.2l8.3-40.6zM62.3 60l11-9.2v-.1l-11-9.2v-7.1l16.2 14v4.9l-16.2 14V60z">
                            </path>
                        </svg>
                    </div>
                    </a>
                </span>

                <!-- Archivos de de texto -->
                <span v-else-if="Ext(file) == 'txt'" class="file-preview other-preview" style="background-color: rgb(107, 83, 59);">                    
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M69.4 28.6v5.5H21.5v-5.5M30.6 41h47.9v5.6H30.6zm-9.1 12.4h47.9V59H21.5zm9.1 12.5h47.9v5.6H30.6z">
                            </path>
                        </svg>
                    </div>
                    </a>
                </span>

                <!-- Imagenes -->
                <span v-else-if="Ext(file) == 'jpg' || Ext(file) == 'png' || Ext(file) == 'jpeg'" class="file-preview image-preview" style="background-color: rgb(146, 152, 84);">
                    <a :href="Img(file)" target="_blank">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <span class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="m 40.400002,35 a 8,8 0 0 1 -8,8 8,8 0 0 1 -8,-8 8,8 0 0 1 8,-8 8,8 0 0 1 8,8 z">
                            </path>
                            <path d="M78.9 47.3l-9.7-9.6L50 57l-9.6-9.7-19.3 19.3V73h57.8z">
                            </path>
                        </svg>
                    </span>
                    </a>
                </span>

                <!-- Videos -->
                <span v-else-if="Ext(file) == 'mp4'" class="file-preview image-preview" style="background-color: rgb(66, 62, 45);">
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <span class="file-icon">
                        <svg viewBox="0 0 48 48">
                            <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z">
                            </path>
                        </svg>
                    </span>
                </span>

                <!-- Archivos cualquiera -->
                <span v-else class="file-preview other-preview" style="background-color: rgba(166, 89, 128, 0.75);">                    
                    <span class="file-ext">{{ Ext(file) }}</span>
                    <span class="file-name p-0 p-1">
                        <span class="file-name-text">{{ file.nombre }}</span>
                    </span>
                    <div class="file-icon">
                        <svg viewBox="0 0 100 100">
                            <path d="M71 36.3L57.8 23.1c-.4-.4-.9-.6-1.4-.6h-26c-1.1 0-2 .9-2 2v51.1c0 1.1.9 2 2 2h39.3c1.1 0 2-.9 2-2V37.7c-.1-.5-.3-1-.7-1.4zm-3.9 2.3H55.5V27l11.6 11.6zm.1 34.5H32.8V26.9h18.5v13.3c0 1.4 1.2 2.6 2.6 2.6h13.3v30.3z">
                            </path>
                        </svg>
                    </div>
                </span>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        fileData: Array
    },
    data() {
        return {
            // data
            files: Array,
        }
    },
    methods: {
        Ext(file){
            var ext = file.archivo.split(".")[1];
            return ext;
        },
        Img(file) {
            let me =this;
            var img = me.Url+"/documents/"+file.archivo;
            return img;
        },
    },
    computed: {
        Url() {
            return this.$store.state.url;
        }
    },
    async beforeMount() {
        let me = this;

        me.files = await me.fileData;
        console.log(me.fileData);
    }
}
</script>