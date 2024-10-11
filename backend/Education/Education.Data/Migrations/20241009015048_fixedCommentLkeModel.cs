using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Education.Data.Migrations
{
    /// <inheritdoc />
    public partial class fixedCommentLkeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "CommentLikes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "CommentLikes");
        }
    }
}
