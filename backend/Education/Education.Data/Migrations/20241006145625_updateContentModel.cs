using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Education.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateContentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contents_Topics_TopicId",
                table: "Contents");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Contents_TopicId",
                table: "Contents");

            migrationBuilder.DropColumn(
                name: "RaitingCount",
                table: "Contents");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Contents");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "Tags",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "SubCategories",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "ContentUsers",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "ContentTags",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "TopicId",
                table: "Contents",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "Contents",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "Comments",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "Categories",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "AspNetUsers",
                newName: "CreatedDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Tags",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "SubCategories",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "ContentUsers",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "ContentTags",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Contents",
                newName: "TopicId");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Contents",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Comments",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Categories",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "AspNetUsers",
                newName: "RegisterDate");

            migrationBuilder.AddColumn<int>(
                name: "RaitingCount",
                table: "Contents",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Contents",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", maxLength: 100, nullable: false),
                    RegisterDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contents_TopicId",
                table: "Contents",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contents_Topics_TopicId",
                table: "Contents",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
