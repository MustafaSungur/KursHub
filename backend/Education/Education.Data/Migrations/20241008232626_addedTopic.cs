using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Education.Data.Migrations
{
    /// <inheritdoc />
    public partial class addedTopic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contents_SubCategories_SubCategoryId",
                table: "Contents");

            migrationBuilder.RenameColumn(
                name: "SubCategoryId",
                table: "Contents",
                newName: "TopicId");

            migrationBuilder.RenameIndex(
                name: "IX_Contents_SubCategoryId",
                table: "Contents",
                newName: "IX_Contents_TopicId");

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", maxLength: 100, nullable: false),
                    SubCategoryId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    State = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Topics_SubCategories_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Topics_SubCategoryId",
                table: "Topics",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contents_Topics_TopicId",
                table: "Contents",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contents_Topics_TopicId",
                table: "Contents");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.RenameColumn(
                name: "TopicId",
                table: "Contents",
                newName: "SubCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Contents_TopicId",
                table: "Contents",
                newName: "IX_Contents_SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contents_SubCategories_SubCategoryId",
                table: "Contents",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
