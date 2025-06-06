import { Injectable } from '@nestjs/common'
import { RoleName } from 'src/shared/constants/role.constant'
import { RoleType } from 'src/shared/models/shared-role.model'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class SharedRoleRepository {
	private roleId: number | null = null
	private adminRoleId: number | null = null
	constructor(private readonly prismaService: PrismaService) {}

	private async getRole(roleName: string) {
		const role: RoleType = await this.prismaService
			.$queryRaw`SELECT * FROM "Role" WHERE name = ${roleName} AND "deletedAt" IS NULL LIMIT 1`.then(
			(res: RoleType[]) => {
				if (res.length === 0) {
					throw new Error('Role not found')
				}
				return res[0]
			},
		)
		return role
	}
	async getRoleId() {
		if (this.roleId) {
			return this.roleId
		}
		const role = await this.getRole(RoleName.Client)
		this.roleId = role.id
		return role.id
	}

	async getAdminRoleId() {
		if (this.roleId) {
			return this.roleId
		}
		const role = await this.getRole(RoleName.Admin)
		this.roleId = role.id
		return role.id
	}
}
