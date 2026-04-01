using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Softium.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectsAndFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    TitleTr = table.Column<string>(type: "text", nullable: false),
                    TitleEn = table.Column<string>(type: "text", nullable: false),
                    TitleDe = table.Column<string>(type: "text", nullable: false),
                    OverlineTr = table.Column<string>(type: "text", nullable: false),
                    OverlineEn = table.Column<string>(type: "text", nullable: false),
                    OverlineDe = table.Column<string>(type: "text", nullable: false),
                    ShortDescriptionTr = table.Column<string>(type: "text", nullable: false),
                    ShortDescriptionEn = table.Column<string>(type: "text", nullable: false),
                    ShortDescriptionDe = table.Column<string>(type: "text", nullable: false),
                    DetailedContentTr = table.Column<string>(type: "text", nullable: false),
                    DetailedContentEn = table.Column<string>(type: "text", nullable: false),
                    DetailedContentDe = table.Column<string>(type: "text", nullable: false),
                    MainImage = table.Column<string>(type: "text", nullable: false),
                    HoverImage = table.Column<string>(type: "text", nullable: true),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    IsDarkTheme = table.Column<bool>(type: "boolean", nullable: false),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    DemoUrl = table.Column<string>(type: "text", nullable: true),
                    DocumentUrl = table.Column<string>(type: "text", nullable: true),
                    TechnicalSpecsDe = table.Column<string>(type: "text", nullable: true),
                    TechnicalSpecsTr = table.Column<string>(type: "text", nullable: true),
                    TechnicalSpecsEn = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectFeatures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    TitleTr = table.Column<string>(type: "text", nullable: false),
                    TitleEn = table.Column<string>(type: "text", nullable: false),
                    TitleDe = table.Column<string>(type: "text", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectFeatures_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectFeatures_ProjectId",
                table: "ProjectFeatures",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Slug",
                table: "Projects",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectFeatures");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
