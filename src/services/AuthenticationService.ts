import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface LoginResult {
    success: boolean;
    message: string;
    user?: User;
}

export class AuthenticationService {

    private currentUser: User | null = null;

    async login(
        username: string,
        password: string
    ): Promise<LoginResult> {

        const user =
            await prisma.user.findUnique({
                where: {
                    username
                }
            });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        if (user.status !== "ACTIVE") {
            return {
                success: false,
                message: "User account is not active"
            };
        }

        if (user.passwordHash !== password) {
            return {
                success: false,
                message: "Invalid password"
            };
        }

        this.currentUser = user;

        return {
            success: true,
            message: "Login successful",
            user
        };
    }

    logout(): void {
        this.currentUser = null;
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }

    async getUserById(
        userId: string
    ): Promise<User | null> {

        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    }
}