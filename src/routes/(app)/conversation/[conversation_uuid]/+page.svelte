<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<p>Conversation with uuid: {data.conversation_uuid}</p>
