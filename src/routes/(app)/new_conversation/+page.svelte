<script lang="ts">
    import MessageForm from "../../../components/inputs/MessageForm.svelte";


</script>

<div class="header-wrapper">
    <h1>What can I help you with?</h1>
</div>
<MessageForm /> 

<style>
    .header-wrapper {
        width: 100%;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 { font-size: 32px; }
    }
</style>
