/**
 * FileGenius - Common Frontend Utilities
 * Reusable helper functions for local file reading, downloads, dropzones, and notifications.
 */

window.FileGenius = window.FileGenius || {};

window.FileGenius.Utils = {
    /**
     * Format byte sizes into human readable units
     */
    formatBytes: function (bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },

    /**
     * Trigger browser download for a Blob or File
     */
    downloadBlob: function (blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
    },

    /**
     * Read File as ArrayBuffer
     */
    readFileAsArrayBuffer: function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Failed to read file as ArrayBuffer'));
            reader.readAsArrayBuffer(file);
        });
    },

    /**
     * Read File as Text
     */
    readFileAsText: function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Failed to read file as Text'));
            reader.readAsText(file);
        });
    },

    /**
     * Read File as Data URL (Base64)
     */
    readFileAsDataURL: function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Failed to read file as DataURL'));
            reader.readAsDataURL(file);
        });
    },

    /**
     * Load an image file or DataURL into an HTMLImageElement
     */
    loadImage: function (fileOrSrc) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to decode image'));

            if (typeof fileOrSrc === 'string') {
                img.src = fileOrSrc;
            } else if (fileOrSrc instanceof Blob) {
                const url = URL.createObjectURL(fileOrSrc);
                img.onload = () => {
                    URL.revokeObjectURL(url);
                    resolve(img);
                };
                img.src = url;
            } else {
                reject(new Error('Invalid image source'));
            }
        });
    },

    /**
     * Setup drag-and-drop listener on a dropzone element
     */
    setupDropzone: function (dropzoneEl, fileInputEl, onFileChange) {
        if (!dropzoneEl || !fileInputEl) return;

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzoneEl.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzoneEl.classList.add('drag-over');
            });
        });

        ['dragleave', 'dragend', 'drop'].forEach(eventName => {
            dropzoneEl.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzoneEl.classList.remove('drag-over');
            });
        });

        dropzoneEl.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (dt && dt.files && dt.files.length > 0) {
                fileInputEl.files = dt.files;
                if (typeof onFileChange === 'function') {
                    onFileChange(dt.files);
                }
            }
        });

        fileInputEl.addEventListener('change', () => {
            if (fileInputEl.files && fileInputEl.files.length > 0) {
                if (typeof onFileChange === 'function') {
                    onFileChange(fileInputEl.files);
                }
            }
        });
    },

    /**
     * Safe HTML sanitization to avoid XSS
     */
    escapeHtml: function (str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    /**
     * Sanitize rendered HTML string from Markdown (allowing safe tags only)
     */
    sanitizeHtml: function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Remove dangerous elements
        const dangerous = doc.querySelectorAll('script, iframe, object, embed, form, input, button, textarea, link, meta, base');
        dangerous.forEach(el => el.remove());

        // Remove dangerous attributes like onerror, onclick, etc. and javascript: urls
        const allElements = doc.querySelectorAll('*');
        allElements.forEach(el => {
            const attrs = Array.from(el.attributes);
            attrs.forEach(attr => {
                if (attr.name.startsWith('on') || attr.value.trim().toLowerCase().startsWith('javascript:')) {
                    el.removeAttribute(attr.name);
                }
            });
        });

        return doc.body.innerHTML;
    },

    /**
     * Calculate SHA-256 hash using Web Crypto API
     */
    calculateSha256: async function (arrayBuffer) {
        if (!crypto.subtle) {
            throw new Error('Web Crypto API is not available in this browser context.');
        }
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Calculate MD5 hash using SparkMD5 if available or native implementation
     */
    calculateMd5: function (arrayBuffer) {
        if (window.SparkMD5 && window.SparkMD5.ArrayBuffer) {
            return window.SparkMD5.ArrayBuffer.hash(arrayBuffer);
        }
        // Fallback simple MD5 or error
        throw new Error('MD5 calculation library not loaded');
    }
};

