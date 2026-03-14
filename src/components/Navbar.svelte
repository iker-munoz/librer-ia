<script lang="ts">
    import { faFileInvoice, faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

    import NavigationButton from "./NavigationButton.svelte";
</script>

<div class="navbar">
    <h1>LibrerIA</h1>
    <hr>
    <div class="navigation">
        <NavigationButton label="New conversation" icon={faPlus}/>
        <NavigationButton label="Conversations" icon={faList}/>
        <NavigationButton label="Documents" icon={faFileInvoice}/>
        <NavigationButton label="Users" icon={faUser}/>
    </div>
    <hr>
</div>

<style>
    .navbar {
        width: 400px;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .navigation {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>
