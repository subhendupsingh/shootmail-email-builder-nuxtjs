<template>
  <div class="container">
    <h1 class="title">Shootmail Email Builder Nuxt</h1>
    
    <!-- Editor container -->
    <div id="shootmail-editor"></div>
    
    <!-- Preview button -->
    <button 
      class="preview-button"
      @click="handlePreview"
    >
      Preview Email
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { ShootmailEditor, MailPreview } from '@shootmail/email-builder'

// Editor instance refs
const editor = ref<ShootmailEditor | null>(null)
const preview = ref<MailPreview | null>(null)

// Initialize editor on mount
onMounted(() => {
  // Import editor dynamically since it requires browser APIs
  import('@shootmail/email-builder').then(({ ShootmailEditor, MailPreview }) => {
    // Initialize editor
    editor.value = new ShootmailEditor({
      elementId: 'shootmail-editor',
      imageServiceUrl: {
        url: 'YOUR_UPLOAD_URL',
        token: 'YOUR_UPLOAD_TOKEN'
      },
      theme: {
        borderRadius: '8',
        padding: true,
        light: {
          editorBackground: '#ffffff',
          editorBorder: '#e2e8f0',
          emailBackground: '#f8fafc'
        },
        dark: {
          editorBackground: '#1e293b', 
          editorBorder: '#334155',
          emailBackground: '#0f172a'
        }
      }
    })

    // Initialize preview modal
    preview.value = new MailPreview({
      closeOnOverlayClick: true,
      onClose: () => {
        console.log('Preview closed')
      }
    })
  })
})

// Handle preview button click
const handlePreview = () => {
  if (editor.value && preview.value) {
    // Get HTML content from editor
    const html = editor.value.getHTML()
    
    // Set content in preview modal
    preview.value.setContent(html)
    
    // Show preview
    preview.value.show()
  }
}

// Clean up on unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
  if (preview.value) {
    preview.value.destroy()
  }
})
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.preview-button {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #0ea5e9;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.preview-button:hover {
  background-color: #0284c7;
}
</style>