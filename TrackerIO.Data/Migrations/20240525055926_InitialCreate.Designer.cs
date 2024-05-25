﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TrackerIO.Data;

#nullable disable

namespace TrackerIO.Data.Migrations
{
    [DbContext(typeof(TrackerDataContext))]
    [Migration("20240525055926_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TrackerIO.Data.Models.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<string>("Bank")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CsvId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<Guid?>("FileId")
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FileId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("TrackerIO.Data.Models.UploadFile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("FileExtension")
                        .HasColumnType("text");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<long?>("FileSize")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("UploadTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("TrackerIO.Data.Models.Transaction", b =>
                {
                    b.HasOne("TrackerIO.Data.Models.UploadFile", "File")
                        .WithMany("Transactions")
                        .HasForeignKey("FileId");

                    b.Navigation("File");
                });

            modelBuilder.Entity("TrackerIO.Data.Models.UploadFile", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}