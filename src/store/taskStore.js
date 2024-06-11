import { defineStore } from "pinia";

import axios from 'axios';

const API_URL = 'https://localhost:44380/api/v1';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        token: "",
        resData: {},
        resUrlData: {},
        resDataTable: {},
        resError: "",
        resFormInfo: [],
        resMenu: [],
        resDataDetail: {},
        resDataTree: {},
        resDataDetailEditAndDelete: {},
        resSelectModule: [],
        resAddData: []
    }),
    actions: {
        async loginStore(reqLoginUser) {
            try {
                const response = await axios.post(API_URL + '/Auth/Login', reqLoginUser)

                // // Log the entire response object
                console.log('Response:', response);

                // // Log the data received in the response
                // console.log('Response data:', response.data);

                // Store token in localStorage
                localStorage.setItem('token', response.data.token);

                // Set token in state
                this.token = response.data.token;

                // Set resData
                this.resData = response.data;

                if (this.resData.token) {
                    window.location.href = '/dashboard'
                }

                // Log resData state
                // console.log("resData state after login:", this.resData);
            } catch (error) {
                this.resError = error || 'An error occurred';
                return false; // Login failed
            }
        },
        async fetchData(reqFormCode, reqBodyForm) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(API_URL + '/Form/GetData/' + reqFormCode, reqBodyForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // // Log the entire response object
                // console.log('Response:', response);

                // Log the data received in the response
                console.log('Response data:', response.data);

                // Set resData
                this.resDataTable = response.data;
                // Log resData state
                console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchMenuGroup(reqFormCode) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/MenuGroup/GetFormInfo/' + reqFormCode, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // // Log the entire response object
                // console.log('Response:', response);

                // Log the data received in the response
                console.log('Response data:', response.data);

                // Set resData
                this.resUrlData = response.data;
                // Log resData state
                console.log("resData state after login:", this.resUrlData);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchMenuGroupGetData(reqFormCode, reqBodyForm) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(API_URL + '/MenuGroup/GetData/' + reqFormCode, reqBodyForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // // Log the entire response object
                // console.log('Response:', response);

                // Log the data received in the response
                console.log('Response data menu group data:', response.data);

                // Set resData
                this.resDataTable = response.data;
                // Log resData state
                console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchDataProcess(reqFormCode, reqBodyForm) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(API_URL + '/Form/GetData/' + reqFormCode, reqBodyForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // // Log the entire response object
                // console.log('Response:', response);

                // Log the data received in the response
                console.log('Response data:', response.data);

                // Set resData
                this.resDataTable = response.data;
                // Log resData state
                console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        logout() {
            // Remove token from localStorage
            localStorage.removeItem('token');
            window.location.href = '/login'

            // Reset state
            this.token = null;
        },
        async fetchFormInfoForm(reqCode) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/Form/GetFormInfo/' + reqCode, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data Menu:', response.data);

                // Set resData
                this.resFormInfo = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchFormInfoFormSkote() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/Common/GetMenuSkote', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data Menu Skote:', response.data);

                // Set resData
                this.resMenu = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchFormDetail(reqFormCode, reqUid) {
            console.log('reqUid', reqUid)
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/Form/GetDataDetail/' + reqFormCode + '/' + reqUid, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data detail:', response.data.data[0].UID);

                // Set resData
                this.resDataDetail = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchMenuGroupDetail(reqFormCode, reqUid) {
            console.log('reqUid', reqUid)
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/MenuGroup/GetDataDetail/' + reqFormCode + '/' + reqUid, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data detail:', response.data);

                // Set resData
                this.resDataDetail = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchMenuTree(reqFormCode, reqObj) {
            console.log('reqUid', reqUid)
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(API_URL + '/MenuGroup/GetDataDetail/' + reqFormCode + '/' + reqUid, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data detail:', response.data.data);

                // Set resData
                this.resDataTree = response.data.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchMenuGroupDetail(reqFormCode, reqUid) {
            console.log('reqUid', reqUid)
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/MenuGroup/GetDataDetail/' + reqFormCode + '/' + reqUid, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data detail:', response.data.data[0].UID);

                // Set resData
                this.resDataDetail = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchFormDetailEditAndDelete(reqFormCode, reqUid) {
            console.log('reqUid', reqUid)
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/Form/GetDataDetail/' + reqFormCode + '/' + reqUid, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data detail edit and delete:', response.data.data[0]);

                // Set resData
                this.resDataDetailEditAndDelete = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async fetchModuleDetail(reqFormCode) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/Form/GetEditor/' + reqFormCode, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Log the entire response object
                console.log('Response:', response);

                 // Log the data received in the response
                console.log('Response data module:', response.data);

                // Set resData
                this.resSelectModule = response.data;
                // Log resData state
                // console.log("resData state after login:", this.resDataTable);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
        async savePostData(reqFormCode, reqBodyForm) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(API_URL + '/Form/SaveData/' + reqFormCode, reqBodyForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // // Log the entire response object
                // console.log('Response:', response);

                // // Log the data received in the response
                // console.log('Response data:', response.data);

                // Set resData
                this.resAddData = response.data;
                // Log resData state
                console.log("resData state after add data:", this.resAddData);
            } catch (error) {
                // Log and store the error
                // console.error('Error:', error.response.data.errors);
                this.resError = error
                return false; // Login failed
            }
        },
    }
})