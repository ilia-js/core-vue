<template>
  <CustomSidebar
    ref="sidebar"
    class="clients-sidebar"
    :title="$lang.title.clients"
    close-button
  >
    <IliaButton
      :label="$lang.button.create"
      icon-pre="plus"
      @click="handleClickAddClient"
      color="forestGreen"
    />
    <DataTable
      :value="clientsFiltered"
      class="clients-sidebar__table"
      :sort-field="ClientsTableColumns.Name"
      :sort-order="1"
    >
      <Column
        :field="ClientsTableColumns.Name"
        :header="clientsTableColumns[ClientsTableColumns.Name].title"
        :sortable="true"
      />
      <Column
        :field="ClientsTableColumns.Action"
        :header="clientsTableColumns[ClientsTableColumns.Action].title"
        class="clients-sidebar__action-column"
      >
        <template #body="{ data }">
          <div class="clients-sidebar__action-column">
            <IliaButton
              icon-pre="pencil"
              @click="handleClickEditClient(data)"
              icon-size="1rem"
              no-border
            />
            <IliaButton
              icon-pre="trash"
              @click="handleClickDeleteClient(data)"
              icon-size="1rem"
              no-border
            />
          </div>
        </template>
      </Column>
      <template #empty> {{ $lang.phrase.noClientsFound }} </template>
    </DataTable>
  </CustomSidebar>
  <ClientDialog ref="clientDialog" />
  <IliaDialog
    ref="deleteClientDialog"
    :title="$lang.title.confirmDeleteClient"
    @cancel="cancelDeleteClient"
    @confirm="confirmDeleteClient"
    :z-index="1200"
  >
    {{ $lang.label.clientName }}: {{ selectedClient?.name }}
  </IliaDialog>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import CustomSidebar from "@/components/sidebars/CustomSidebar.vue";
import IliaButton from "@/components/schedule/IliaButton.vue";
import {
  clientsTableColumns,
  ClientsTableColumns,
} from "@/settings/tables/clientsTable";
import { useScheduleStore } from "@/store/scheduleStore";
import ClientDialog from "@/components/schedule/ClientDialog.vue";
import type { Client } from "@/types/schedule";
import IliaDialog from "@/components/dialogs/IliaDialog.vue";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { loadClients, archiveClient } = scheduleStore;

const clientDialog = ref();
const selectedClient = ref<Client>();
const sidebar = ref();
const deleteClientDialog = ref();

const clientsFiltered = computed(() => {
  return clients.value.filter((item) => !item.archived);
});

const open = async () => {
  await loadClients();

  sidebar.value.open();
};

const handleClickAddClient = () => {
  clientDialog.value.open();
};

const handleClickDeleteClient = async (client: Client) => {
  selectedClient.value = client;
  deleteClientDialog.value.open();
};

const handleClickEditClient = async (client: Client) => {
  selectedClient.value = client;
  clientDialog.value.open(client);
};

const cancelDeleteClient = () => {
  selectedClient.value = undefined;
};

const confirmDeleteClient = async () => {
  if (!selectedClient.value) {
    return;
  }

  await archiveClient(selectedClient.value);

  selectedClient.value = undefined;
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.clients-sidebar {
  &__title {
    @include header-one-and-quarter;
    margin-bottom: $px-10;
  }

  &__table {
    margin-top: $px-15;
  }

  &__action-column {
    display: flex;
    justify-content: center;
    gap: $px-15;
  }
}

:deep(th.clients-sidebar__action-column .p-column-header-content) {
  justify-content: center !important;
}
</style>
<style lang="scss">
.clients-sidebar.p-sidebar {
  width: 25% !important;
  min-width: 25rem;
}
</style>
