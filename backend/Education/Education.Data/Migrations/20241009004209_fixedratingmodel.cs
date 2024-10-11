using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Education.Data.Migrations
{
    /// <inheritdoc />
    public partial class fixedratingmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "Ratings",
                newName: "CreatedDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Ratings",
                newName: "RegisterDate");
        }
    }
}
