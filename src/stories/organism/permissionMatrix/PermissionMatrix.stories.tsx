import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import PermissionMatrix, {
  PermissionMatrixRow,
  PermissionMatrixType,
} from '../../../component/organism/permissionMatrix/PermissionMatrix';

const initialPermissions: PermissionMatrixRow[] = [
  {
    featureCode: 'users_list',
    featureName: 'Users List',
    groupName: 'User Management',
    read: true,
    create: false,
    update: true,
    delete: false,
  },
  {
    featureCode: 'users_edit',
    featureName: 'Users Edit',
    groupName: 'User Management',
    read: true,
    create: true,
    update: true,
    delete: false,
  },
  {
    featureCode: 'fees_view',
    featureName: 'Fees View',
    groupName: 'Fees',
    read: true,
    create: false,
    update: false,
    delete: false,
  },
  {
    featureCode: 'fees_manage',
    featureName: 'Fees Manage',
    groupName: 'Fees',
    read: true,
    create: true,
    update: true,
    delete: true,
  },
];

const meta: Meta<typeof PermissionMatrix> = {
  title: 'Organism/PermissionMatrix',
  component: PermissionMatrix,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Generic grouped permission matrix with expandable groups and group-level permission toggles.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PermissionMatrix>;

const InteractiveMatrix = (args: {
  actionLabel?: string;
  permissionsLabel?: string;
  hidePermissionsLabel?: string;
}) => {
  const [permissions, setPermissions] = useState<PermissionMatrixRow[]>(initialPermissions);

  const onPermissionToggle = (featureCode: string, type: PermissionMatrixType) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.featureCode === featureCode
          ? { ...permission, [type]: !permission[type] }
          : permission
      )
    );
  };

  const onGroupPermissionToggle = (groupName: string, type: PermissionMatrixType) => {
    const groupItems = permissions.filter((permission) => permission.groupName === groupName);
    if (groupItems.length === 0) return;

    const allEnabled = groupItems.every((permission) => permission[type]);
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.groupName === groupName ? { ...permission, [type]: !allEnabled } : permission
      )
    );
  };

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      <PermissionMatrix
        permissions={permissions}
        onPermissionToggle={onPermissionToggle}
        onGroupPermissionToggle={onGroupPermissionToggle}
        actionLabel={args.actionLabel}
        permissionsLabel={args.permissionsLabel}
        hidePermissionsLabel={args.hidePermissionsLabel}
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveMatrix {...args} />,
};

export const CustomLabels: Story = {
  render: (args) => <InteractiveMatrix {...args} />,
  args: {
    actionLabel: 'Module',
    permissionsLabel: 'Show items',
    hidePermissionsLabel: 'Hide items',
  },
};
